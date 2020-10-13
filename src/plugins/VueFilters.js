import Vue from 'vue'

const formatDate = (currentDate) => {
  let date = new Date(currentDate), 
            day = (date.getDate() + 1).toString(),
            dayF = (day.length == 1) ? '0' + day : day, 
            month = (day.getMonth() + 1).toString(),
            monthF = (month.length == 1) ? '0' + month : month,
            yearF = date.getFullYear()

  return dayF+"/"+monthF+"/"+yearF
}

const formatPrice = (price) => {
  let val = (price/1).toFixed(2).replace('.', ',')
  return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
} 

Vue.filter('dateformat', formatDate)
Vue.filter('formatprice', formatPrice)