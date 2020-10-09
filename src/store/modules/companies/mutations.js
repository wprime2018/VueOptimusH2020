import { Object } from "core-js"

export default {
  SET_COMPANIES (state, companies) {
    state.items = companies
  },
  
  SET_COMPANY_SELECTED (state, company) {
      state.companySelected = Object.assign(company, state.companySelected )  
  },

  SET_CATEGORIES_COMPANY (state, categories) {
    state.categoriesCompanySelected = categories
  },

  SET_PRODUCTS_COMPANY (state, products) {
    state.companySelected.products = products
  },
  
  SET_TABLES_COMPANY (state, tables) {
    state.companySelected.tables = tables
  },
}