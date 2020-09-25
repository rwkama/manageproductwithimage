var mysql = require('mysql');
const util = require('util');


const con = mysql.createConnection({
    host: "b9jbfcptjkebgumjgqcp-mysql.services.clever-cloud.com",
    user: "uspxlfrkmj6n77hh",
    password: "WVbnrB6romi7rSxKVTz9",
    database: "b9jbfcptjkebgumjgqcp"

});

const utliquery = util.promisify(con.query).bind(con);

const getProductos = async () => {
    sqllist = "select * from Producto";
    let rows = await utliquery(sqllist);
    let array = [];
    for (var x of rows) {
        objecto = new Producto(x.IdProducto, x.ImgProducto);
        array.push(objecto);
    }
    return array;
}
const getProducto = async (id) => {
    
    sqllist = "select * from Producto where IdProducto=?";
    let row = await utliquery(sqllist,id);
    objecto = new Producto(row[0].IdProducto, row[0].ImgProducto);
    return objecto;
  
   
}
const updateProducto = async (producto) => {
    sqlupdate = "UPDATE Producto SET ImgProducto= ? WHERE IdProducto = ?;";
    values = [producto.imgproducto, producto.idproducto]
    let x = await con.query(sqlupdate, values);
}
async function insertProducto(producto) {

    sqlinsert = "insert into Producto values (null,?);";
    values = [producto.imgproducto]
        let x = await con.query(sqlinsert, values);
   
};
async function deleteProducto(producto) {
   
        sqldelete = "delete from Producto where IdProducto = ?;";
        values = [producto.idproducto]
        let x = await con.query(sqldelete, values);
 
};

class Producto
{
    idproducto = 0; 
    imgproducto = "";

     getIdProducto() {
        return this.idproducto;
    }
    setIdProducto(x) {
        this.idproducto = x;
    }
    getImgProducto() {
        return this.imgproducto;
    }
    setImgProducto(x) {
        this.imgproducto = x;
    }
    constructor(idproducto, imgproducto) {
        this.setIdProducto(idproducto);
        this.setImgProducto(imgproducto);
       
    }
}
module.exports = { getProductos, insertProducto, getProducto, updateProducto,deleteProducto, Producto};
//var c = new Producto(555, "kneptunoh.jpg");
//insertProducto(c).then(data => {
//    console.log(data)
//})
//deleteProducto(c).then(data => {
//    console.log(data)
//})
//getProductos().then(data => {
//    console.log(data)
//})

//getProducto(3).then(data => {
//    console.log(data)
//})

