import Head from 'next/head';
import Link from "next/link";
import CategoryComponent from '../Components/Category/CategoryComponent';
import styles from "../styles/index.module.css";
import Layout from "../Layout/index";
import { API_KEY, BASE_URL } from '../config/baseUrl';
import ButtonComponent from "../Layout/Button";
// +"&child="+list.sub_category
function Home(props) {
 

 console.log(props.data)

  const category = props.data.category.map((list,index) => {
   if(list.title != null){
    return (
      // <Link href={"/category?category="+list.child_category_name}>
      //   <a>
          <CategoryComponent key={list._id} category={list.title} />
      //   </a>
      // </Link>
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
            </div>
        </div>

    </Layout>
  )
}



Home.getInitialProps = async function() {
  
  const res = await fetch(`https://server.mysastaprice.com/user/category`);
  const data = await res.json();
 
  return {
      data
  }
}


export default Home;