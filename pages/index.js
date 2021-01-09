import Head from 'next/head';
import Link from "next/link";
import CategoryComponent from '../Components/Category/CategoryComponent';
import styles from "../styles/index.module.css";
import Layout from "../Layout/index";
import { API_KEY, BASE_URL } from '../config/baseUrl';
import ButtonComponent from "../Layout/Button";

function Home(props) {
 

  const category = props.data.category.map((list,index) => {
   if(list.title != null){
    return (
      
          <CategoryComponent key={list._id} category={list.title} />
      
    )
   }
  
 })

  return (
    <Layout >
      <Head>
          
          <title>Mysastaprice : Price Comparison Store</title>
          <meta name="title" content="Mysastaprice Price Comparison Store" />
          <meta name="description" content="Compare the prices of mobile, laptop, electronic gadgets and it accessories with multiple e-commerce store." />

         
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://mysastaprice.tk/" />
          <meta property="og:title" content="Mysastaprice Price Comparison Store" />
          <meta property="og:description" content="Compare the prices of mobile, laptop, electronic gadgets and it accessories with multiple e-commerce store." />
          <meta property="og:image" content="/logo.png" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://mysastaprice.tk/" />
          <meta property="twitter:title" content="Mysastaprice Price Comparison Store" />
          <meta property="twitter:description" content="Compare the prices of mobile, laptop, electronic gadgets and it accessories with multiple e-commerce store." />
          <meta property="twitter:image" content="/logo.png" />

      </Head>
      <div className={styles.category}>
            <div className={styles.explore}>
                
              <div className={styles.grid}>
                {category }
            </div>
            </div>
        </div>

    </Layout>
  )
}



Home.getInitialProps = async function() {
  
  const res = await fetch(`https://server.mysastaprice.tk/user/category`);
  const data = await res.json();
 
  return {
      data
  }
}


export default Home;