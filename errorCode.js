const errorCode = (key)=>
({
    400:"Missing fields in request body",
    404:(name,existed)=>`A ${name} with provided ${existed} does not exist`,
    409:(name,existed)=>`A ${name} with provided ${existed} already exists`
})[key]


module.exports = {errorCode};