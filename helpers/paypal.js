import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: 'sandbox', // 'sandbox' or 'live'
  client_id: 'AYZYMYN1TSxnw9XrkgDaBPRevcEdCVlzgBH_m2h4KjtnxwmrPIeQxuqoekOnXf5GqVKtq5HDpKM3Z913', // Add your client ID here
  client_secret: 'EIs5D8DNR7GQsBJwOqcUOr91_Jt5VTha-eoUA-fofuOCxi93qL3bZ1fSQ_QY9-dp-dpd_zD9iXJkseqD' // Add your client secret here
});

export default paypal;