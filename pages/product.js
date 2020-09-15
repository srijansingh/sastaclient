import Layout from "../Layout/index";
import { API_KEY, BASE_URL } from '../config/baseUrl';
import ButtonComponent from "../Layout/Button";
import { useRouter } from 'next/router'
import ProductComponent from '../Components/Product/ProductComponent';
import styles from "../styles/product.module.css";
import ProductDeatils from "../Components/Details/ProductDeatils";
import Compare from "../Components/Details/Compare";
import Head from "next/head";

function Home(props) {

  const router = useRouter()
  const category_name = router.query.category;


  const amazon =  props.data.data.stores[0].amazon;
  const flipkart =  props.data.data.stores[1].flipkart;
  const tatacliq  =  props.data.data.stores[11].tatacliq;



 const flip = (
  <Compare
    cod={flipkart.is_cod}
    emi={flipkart.is_emi}
    color={flipkart.product_color}
    delivery={flipkart.product_delivery}
    delivery_cost={flipkart.product_delivery_cost}
    mrp={flipkart.product_mrp}
    offer={flipkart.product_offfer}
    price={flipkart.product_price}
    logo="https://images-api.datayuge.in/image/ZmxpcGthcnRfc3RvcmUucG5n.png"
    url={flipkart.product_store_url}
    return={flipkart.return_time}
    store={flipkart.product_store}
/>
 ) 


 const tata = (
  <Compare
    cod={tatacliq.is_cod}
    emi={tatacliq.is_emi}
    color={tatacliq.product_color}
    delivery={tatacliq.product_delivery}
    delivery_cost={tatacliq.product_delivery_cost}
    mrp={tatacliq.product_mrp}
    offer={tatacliq.product_offfer}
    price={tatacliq.product_price}
    logo="https://images-api.datayuge.in/image/dGF0YWNsaXFfc3RvcmUucG5n.png"
    url={tatacliq.product_store_url}
    return={tatacliq.return_time}
    store={tatacliq.product_store}
/>
 ) 


 const amaz = (
  <Compare
    cod={amazon.is_cod}
    emi={amazon.is_emi}
    color={amazon.product_color}
    delivery={amazon.product_delivery}
    delivery_cost={amazon.product_delivery_cost}
    mrp={amazon.product_mrp}
    offer={amazon.product_offfer}
    price={amazon.product_price}
    logo="https://images-api.datayuge.in/image/YW1hem9uX3N0b3JlLnBuZw.png"
    url={amazon.product_store_url}
    return={amazon.return_time}
    store={amazon.product_store}
/>
 )

 
  
  const productDetail = <ProductDeatils 
                            key={props.data.data.product_id}
                            images={props.data.data.product_images}
                            title={props.data.data.product_name}
                            category={props.data.data.product_category}
                            brand={props.data.data.product_brand}
                            price={props.data.data.product_mrp}
                            model={props.data.data.product_model}
                            comparable={props.data.data.is_comparable}
                            available={props.data.data.is_available}
                            mrp={props.data.data.product_mrp}
                            rating={props.data.data.product_ratings}
                            colors={props.data.data.available_colors}
                          />
  
  const url="https://mysastaprice.com/product?id="+router.query.id;
  const description ="Product name : "+ props.data.data.product_name + ", Category : " +props.data.data.product_category + ", Model : " +props.data.data.product_model + ", Price : " + props.data.data.product_mrp + "only from Mysastaprice"
  return (

    <Layout category={category_name} >
       <Head>
          
          <title>{props.data.data.product_name}</title>
          <meta name="title" content={props.data.data.product_name} />
          <meta name="description" content={description} />

         
          <meta property="og:type" content="website" />
          <meta property="og:url" content={url} />
          <meta property="og:title" content={props.data.data.product_name} />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={props.data.data.product_images[0]} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={url} />
          <meta property="twitter:title" content={props.data.data.product_name} />
          <meta property="twitter:description" content={description} />
          <meta property="twitter:image" content={props.data.data.product_images[0]} />

      </Head>

      <div className={styles.container}>
       <div className={styles.box}>
          {productDetail}
       </div>
       <div className={styles.compare}>

        {flip}
        {tata}
        {amaz}

       </div>
    </div>

      

    </Layout>
  )
}



Home.getInitialProps = async function(context){
   
  const res = await fetch(`${BASE_URL}/detail?api_key=${API_KEY}&id=${context.query.id}`);
  const data = await res.json();
 
  return {
      data
  }
}


export default Home;