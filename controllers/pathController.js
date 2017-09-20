exports.home = ( req, res ) => {
  res.render('index', { title: 'NbaGeeks'})
};

exports.about = ( req, res ) => {
  res.render('about', { title: 'About'})
};

exports.login = ( req, res ) => {
  res.render('login', { title: 'Login'})
};