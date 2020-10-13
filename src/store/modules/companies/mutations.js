import { Object } from "core-js"

export default {
  SET_COMPANIES (state, companies) {
    state.items = companies
  },
  
  SET_COMPANY_SELECTED (state, company) {
      state.companySelected = Object.assign(company, state.companySelected )  
  },

  REMOVE_COMPANY_SELECTED (state) {
    state.companySelect = {
      name: '',
      products: {
        data: []
      },
      tables: {
        identify: '',
        description: ''
      }
    },
  
    state.categoriesCompanySelected ={
      data:[],
      products: {
        data: []
      } 
    }
  },

  SET_CATEGORIES_COMPANY (state, categories) {
    state.categoriesCompanySelected = categories
  },

  SET_PRODUCTS_COMPANY (state, products) {
    state.companySelected.products = products
  },
  
  SET_TABLE_COMPANY (state, table) {
    state.companySelected.table = table
  },

  REMOVE_TABLE_COMPANY (state, tables) {
    state.companySelected.tables = {
      identify: '',
      description: ''
    }
  },
}