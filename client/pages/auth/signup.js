export default () => {
  return(
    <form action="">
      <h1>Signup</h1>
      <div className="form-group">
        <label>Email Adress</label>
        <input className="form-control"/>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input type="password" className="form-control"/>
      </div>
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};