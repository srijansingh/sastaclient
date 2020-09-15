import Head from 'next/head';
import Layout from "../Layout/index";
import { API_KEY, BASE_URL } from '../config/baseUrl';
import ButtonComponent from "../Layout/Button";
import { useRouter } from 'next/router'
import ProductComponent from '../Components/Product/ProductComponent';
import styles from "../styles/category.module.css";

function Home(props) {


  const router = useRouter()
  const category_name = router.query.category;
  let pagenum;

  if(router.query.page){
    pagenum = parseInt(router.query.page)
  }
  else{
    pagenum = 1;
  }
  const next_num = pagenum + 1
  const prev_num = pagenum - 1

  const next_page_url = next_num + "&category="+category_name;
  const prev_page_url = prev_num +"&category="+category_name;

  const length = props.data.data.length;
  const listing = props.data.data.map((list,index) => {

    return <ProductComponent 
              key={index}
              id={list.product_id}
              title={list.product_title}
              image={list.product_image}
              rating={list.product_rating}
              price={list.product_lowest_price}
              sub_category={list.product_sub_category}
              category_name={category_name}
            />
 })

 const url = "https://mysastaprice.com/category="+category_name;

  return (
    <Layout category={category_name} >
       <Head>
          
          <title>{category_name}</title>
          <meta name="title" content={category_name} />
          <meta name="description" content={"Compare latest product of " + category_name + " category"} />

         
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={category_name} />
          <meta property="og:description" content={"Compare latest product of " + category_name + " category"} />
          <meta property="og:image" content="/logo.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={url} />
          <meta property="twitter:title" content={category_name} />
          <meta property="twitter:description" content={"Compare latest product of " + category_name + " category"} />
          <meta property="twitter:image" content="/logo.png" />

      </Head>
      <div className={styles.flatbox}>
                <div className={styles.flatcontainer}>
                    {listing}
                </div>
                <hr/>
                {
                  length >=50 ? 

                  <div className={styles.buttons}>
                    <ButtonComponent name="Prev" link={prev_page_url}/>
                    <ButtonComponent name="Next" link={next_page_url} />
                </div>

                :
                ''
                }
            </div>

    </Layout>
  )
}



Home.getInitialProps = async function(context){
    let page;
    if(context.query.page){
        page = context.query.page;
    }
    else{
        page = 1
    }

  const res = await fetch(`${BASE_URL}/search?api_key=${API_KEY}&product=${context.query.category}&sort=popularity&can_compare=1&page=${page}`);
  const data = await res.json();
 
  return {
      data
  }
}


export default Home;