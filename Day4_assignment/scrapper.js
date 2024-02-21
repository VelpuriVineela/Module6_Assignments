console.log("Web Scrapper");
const axios = require("axios");
const cheerio = require("cheerio");
const xlsx = require("xlsx");
/**
 * 1. Get the data from a certain page from Amazon - axios, fetch
 * 2. Filter / find the required data from the page
 * 3. Store those information into an excel file
 */

let products = [];
const getDataFromAmazon = async () => {
  try {
    const response = await axios.get(
      "https://www.flipkart.com/search?q=phone&otracker=search&otracker1=search&marketplace=FLIPKART&as-show=on&as=off",
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
    // console.log(response.data);
    const $ = cheerio.load(response.data);

    // $("div._2kHMtA").each((index, data) => {
    //   const productName = $(data).find("div._4rR01T").text();
    //   const productPrice = $(data).find("div._30jeq3._1_WHN1").text();

    //   if (productName && productPrice) {
    //     products.push({
    //       name: productName.trim(),
    //       price: productPrice.trim(),
    //     });
    //   }
    // });

    $("div._2kHMtA").each((index, element) => {
      const productName = $(element).find("div._4rR01T").text().trim();
      const productPrice = $(element).find("div._30jeq3._1_WHN1").text().trim();
      const rating = $(element).find("div._3LWZlK").text().trim();
      const productfeedback = $(element)
        .find("span._2_R_DZ span span")
        .text()
        .trim();

      products.push({
        name: productName,
        price: productPrice,
        rating: rating,
        feedback: productfeedback,
      });
    });

    console.log(products);

    /**
     * 1. Create a workbook (Excel file)
     * 2. Create a sheet (Excel sheet)
     * 3. Attach the sheet to the file
     * 4. Insert the data into sheet
     * 5. Write the file to filesystem
     */

    const workbook = xlsx.utils.book_new();
    const sheetData = products.map((product) => [
      product.name,
      product.price,
      product.rating,
      product.feedback,
    ]);

    const workSheet = xlsx.utils.aoa_to_sheet([
      ["Name", "Price", "Rating", "Product Feedback"],
      ...sheetData,
    ]);

    xlsx.utils.book_append_sheet(workbook, workSheet, "Sheet1");
    xlsx.writeFile(workbook, "output.xlsx");
  } catch (err) {
    console.log(err);
  }
};

getDataFromAmazon();
