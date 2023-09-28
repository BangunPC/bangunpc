import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import styles from "./item-card.module.css";
import { HiPlusOutline } from "@qwikest/icons/heroicons";
type Props = {
  shimmer: boolean;

  brand_name: string | null;
  category: string | null;
  image_path: string | null;
  price: number | null;
  product_detail_id: number | null;
  product_name: string | null;
  slug: string | null;
  stock: number | null;
  url: string | null;
};

export default component$<Props>((props) => {
  const {
    shimmer,

    // product_detail_id,
    slug,
    product_name,
    image_path,
    brand_name,
    price,
    // url,
    // stock,
    category,
  } = props;
  return (
    <Link
      class={styles["card"]}
      href={shimmer ? "" : "/catalogue/" + slug + "/"}
    >
      <span class={styles["category"]}>{category}</span>
      <img
        width={400}
        height={400}
        src={
          "https://onawoodgnwkncueeyusr.supabase.co/storage/v1/object/public/product-images/" +
          image_path
        }
        // alt={product_name}
      />
      <div class={styles["brand-wrapper"]}>
        <span class={styles["brand"]}>{brand_name}</span>
      </div>
      <span class={styles["name"]}>{product_name}</span>
      <span class={styles["price"]}>Rp{price?.toLocaleString("id-ID")}</span>
      <footer class={styles["card-footer"]}>
        <btn aria-label="add to cart" class={styles["icon-wrapper"]}>
          <HiPlusOutline class="w-full h-full p-2" />
        </btn>
      </footer>
    </Link>
  );
});
