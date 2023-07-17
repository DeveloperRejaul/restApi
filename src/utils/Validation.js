const Validation  = () => {
  return {
    /**
     * @description this function for check valid mail
     * @param {string} email
     * @returns  Boolean value
     */
    isEmail: (email) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    },

    /**
     *
     * @param {string} num
     * @returns  Boolean value
     */

    isPhoneNumber: (num) => {
      const phonePattern = /^\d{11}$/;
      const cleanedPhoneNumber = num.replace(/\D/g, '');
      if (phonePattern.test(cleanedPhoneNumber)) return true;
      return false;
    },

    /**
     * @description this function for check valid mail
     * @param {object} obj request body
     * @param {number} len number of object length
     * @returns  Boolean value
     */
    objKeysLength: (obj = {}, len) => {
      if (Object.keys(obj).length == len) return true
      return false

    },

    /**
     * @description this function for check Empty value
     * @param {object} obj request body
     * @param {number} len number of object length
     * @returns  Boolean value
     */
    isEmpty: (...value) => {
      for (let i = 0; i < value.length; i++) {
        return value[i] === "" ? true :false
      }
    }


  }
}


export default Validation
