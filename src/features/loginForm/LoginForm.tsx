import React, { useState } from 'react';
import styles from './LoginForm.module.scss';
import * as Yup from "yup";
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import cn from "classnames";
import { useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { endpoints } from '../../api/endpoints';
import { useAuth } from '../../app/hooks';

const formValidation = Yup.object().shape({
  email: Yup.string()
    .email("Некоректный email")
    .required("Обязательно"),
  password: Yup.string().required("Обязательно")
});

export function LoginForm() {
  const [values, setValues] = useState({
    showPassword: false,
  });
  const navigate = useNavigate();
  const auth = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(formValidation)
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const regClick = () => {
    navigate("/registration");
  };

  const onSubmit = async (data) => {
    try {
      const { data: loginData } = await endpoints.login(data);
      console.log("form: ", data);
      console.log("api: ", loginData);
      auth.setToken(loginData.accessToken);
      auth.setUserData(loginData.user);

      localStorage.setItem("user", JSON.stringify(loginData.user));
    } catch (e: any) {
      if (e.response.status === 422) {
        Object.keys(e.response.data.errors).forEach((key) => {
          setError(key, {
            type: "manual",
            message: e.response.data.errors[key],
          });
        });
      }
    }
  };

  return (
    <div className={styles.loginFormWrapper}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <span className={styles.title}>Login</span>
        <Controller
          name='email'
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.email?.message)}
              fullWidth={true}
              type="email"
              label="Email"
              variant="outlined"
              helperText={errors.email?.message}
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          defaultValue=""
          render={({ field }) => (
            <FormControl variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                {...field}
                type={values.showPassword ? 'text' : 'password'}
                error={Boolean(errors.password?.message)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {values.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
          )}
        />
        <div className={styles.buttons}>
          <button className={styles.registration} type="button"
            onClick={() => regClick()}>
            Registration
          </button>
          <button className={cn(styles.login, styles.active)}
            type="submit">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
