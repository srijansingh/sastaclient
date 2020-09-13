import Head from 'next/head';
import Link from "next/link";
import CategoryComponent from '../Components/Category/CategoryComponent';
import styles from "../styles/index.module.css";
import Layout from "../Layout/index";
import { API_KEY, BASE_URL } from '../config/baseUrl';
import ButtonComponent from "../Layout/Button";
// +"&child="+list.sub_category
function Home(props) {
 

  const next_page_url = props.data.current_page+1;
  const prev_page_url = props.data.current_page-1;

  const category = props.data.data.map((list,index) => {
   if(list.child_category_name != null){
    return (
      <Link href={"/category?category="+list.child_category_name}>
        <a>
          <CategoryComponent key={list.id} category={list.child_category_name} />
        </a>
      </Link>
    )
   }
  
 })

  return (
    <Layout >
      
      <div className={styles.category}>
            <div className={styles.explore}>
                
              <div className={styles.grid}>
                {category }
            </div>
            <hr/>
              <div className={styles.buttons}>
                  <ButtonComponent name="Prev" link={prev_page_url}/>
                  <ButtonComponent name="Next" link={next_page_url} />
              </div>
            </div>
        </div>

    </Layout>
  )
}



Home.getInitialProps = async function(context) {
  let page;
  if(context.query.page){
    page = context.query.page;
  }
  else{
    page = 1
  }
  const res = await fetch(`${BASE_URL}/list/categories?api_key=${API_KEY}&page=${page}`);
  const data = await res.json();
 
  return {
      data
  }
}


export default Home;