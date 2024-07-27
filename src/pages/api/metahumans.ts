export default async function handler(req, res) {
    const response = await fetch('http://homologacao3.azapfy.com.br/api/ps/metahumans');
    const data = await response.json();
  
    res.status(200).json(data);
}