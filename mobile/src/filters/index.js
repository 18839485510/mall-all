export default {
    formatPrice(price){
         return parseFloat(price).toFixed(2)
    },
    formatDate(date){
        return new Date(date).toLocaleString()
   },
}