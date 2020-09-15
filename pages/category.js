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

  return (
    <Layout category={category_name} >
      
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