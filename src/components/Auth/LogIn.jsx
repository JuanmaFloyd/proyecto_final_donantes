import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import swal from '@sweetalert/with-react';
import { Grid, Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  image: {
    backgroundImage: 'url(https://imagenes.diario16.com/wp-content/uploads/2019/06/donar-sangre.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

export const LogIn = () => {
  const classes = useStyles();
  const history = useHistory();
  const [dni, setDNI] = useState("");
  const [pwd, setPwd] = useState("");

  useEffect(() => {
      axios.get("http://localhost:5000/donante/isAuth", {"headers": {"token": sessionStorage.getItem("dtoken")}})
          .then(() => history.push("/"))
          .catch(() => null)
  }, [history])

  const handleLogin = () => {
      var data = {
          dni: dni,
          password: pwd
      }

      axios.post("http://localhost:5000/donante/signin", data)
          .then(res => {
              sessionStorage.setItem("dtoken", res.data);
              history.push("/");
          })
          .catch(
              () => swal("Nickname o contraseña incorrectos", "", "error")
          )
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <div className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="dni"
              label="DNI"
              name="dni"
              autoFocus
              onChange={e => setDNI(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPwd(e.target.value)}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Conectarse
            </Button>
            <Typography>
              <Link to="signup">Registrarse</Link>
            </Typography>
          </div>
        </div>
      </Grid>
    </Grid>
  );
}