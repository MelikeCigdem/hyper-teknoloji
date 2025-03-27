import axios from "axios";

const fetchProducts = async () => {
  try {
    const response = await axios.post(
      `${process.env.API_BASE_URL}/Products/List`,
      {},
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`, // ✅ Token daha güvenli
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("API Hatası:", error?.response?.data || error.message);
    return [];
  }
};

export default fetchProducts;
