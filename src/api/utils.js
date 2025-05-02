const PAYSTACK = {
    pubKey:'pk_test_4e634e3dee2069a6c3767982040ed0c141ff9560',
}

const TB_ALERT = {
    error:(title, desc)=>{
        return {
            title: title,
            description: desc,
            status: "error",
            duration: 3000,
            isClosable: true,
          }
    },
    warning:(title, desc)=>{
        return {
            title: title,
            description: desc,
            status: "warning",
            duration: 3000,
            isClosable: true,
          }
    },
    success:(title, desc)=>{
        return {
        title: title,
        description: desc,
        status: "success",
        duration: 3000,
        isClosable: true,
        }
    },
    info:(title, desc)=>{
        return {
            title: title,
            description: desc,
            status: "info",
            duration: 3000,
            isClosable: true,
          }
    }
}

export { TB_ALERT, PAYSTACK }
