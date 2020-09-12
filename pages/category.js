import Head from 'next/head';
import Layout from "../Layout/index";
import { API_KEY, BASE_URL } from '../config/baseUrl';
import ButtonComponent from "../Layout/Button";
import { useRouter } from 'next/router'
import ProductComponent from '../Components/Product/ProductComponent';
import styles from "../styles/category.module.css";

function Home(props) {

  console.log(props.data);

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

  const listing = props.data.data.map((list,index) => {
    return <ProductComponent 
              key={index}
              title={list.product_title}
              image={list.product_image}
              rating={list.product_rating}
              price={list.product_lowest_price}
              sub_category={list.product_sub_category}
            />
 })

  return (
    <Layout >
      
      <div className={styles.flatbox}>
                <div style={{color:'#d94711',textAlign:'left'}}>
                  <h1 style={{color:'#d94711',textAlign:'left',fontFamily:'montserrat-bold'}}>{category_name}</h1>
                </div>
                <div className={styles.flatcontainer}>
                    {listing}
                </div>
                <hr/>
                <div className={styles.buttons}>
                    <ButtonComponent name="Prev" link={prev_page_url}/>
                    <ButtonComponent name="Next" link={next_page_url} />
                </div>
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

  const res = await fetch(`${BASE_URL}/search?api_key=${API_KEY}&product=${context.query.category}&can_compare=1&intems=100&page=${page}`);
  const data = await res.json();
 
  return {
      data
  }
}


export default Home;