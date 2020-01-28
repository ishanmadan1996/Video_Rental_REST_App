module.exports = function asyncMiddleware(handler){
    return async (req, res, next) => {
      try{
        await handler(req, res);
      }
      catch(ex){
        next(ex)
      }
    };
  };

  // this funciton simply wraps the funciton it receievs as param
  // in a try catch block and then returns the reference of that function
  // back to the router module which calls it, for the xpress fm to then call it
  // at runtime.