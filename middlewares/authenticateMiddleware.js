module.exports = async function(req,res,next){
    console.log('auth middleware');
    next();
};