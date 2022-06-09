import React, { useRef, useState } from "react";
import styles from "./modal.module.scss";
import cn from "classnames";
import close from "./assets/close_24px.svg";
import { useAppDispatch, useAuth } from "../../app/hooks";
import avatar from "../news/assets/monogram.svg";
import plus from "./assets/icon.svg";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { TextField } from "@material-ui/core";
import mockImage from "../news/assets/media.png";
import { endpoints } from "../../api/endpoints";
import { pushPost } from "../news/NewsSlice";

export const MyModal = ({ active, setActive }: any) => {
    const dispatch = useAppDispatch();
    const auth = useAuth();
    const [image, setImage] = useState<any>("");
    const inputRef = useRef(null);
    const formValidation = Yup.object().shape({
        title: Yup.string().required("Обязательно"),
        description: Yup.string().required("Обязательно"),
    });

    const {
        control,
        handleSubmit,
        getValues,
    } = useForm({
        resolver: yupResolver(formValidation)
    });

    const onSubmit = async (data) => {
        try {
            if (image) {
                const { title, description } = getValues();
                const { data: newsData } = await endpoints.newsCreate({
                    title,
                    description,
                    image
                });
                dispatch(pushPost(newsData));
            }

        } catch (e: any) {
            console.log(e);
        }
    };

    const onInputChange = () => {
        const input: any = inputRef.current;
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
        };
        file && reader.readAsDataURL(file);
    };

    return (
        <div className={cn(styles.modal, {
            [styles.active]: active
        })}
            onClick={() => setActive(false)}>
            <img src={close} className={styles.close}
            />
            <div className={styles.content}
                onClick={(e) => e.stopPropagation()}>
                <div className={styles.user}>
                    <img src={avatar} />
                    {auth.userData.name}
                </div>
                <div className={styles.imageWrapper} style={{ backgroundImage: `url(${mockImage})` }}>
                    <label htmlFor="upload-photo" className={styles.addImage}>
                        <img src={plus} />
                        <span>Add Image</span>
                    </label>
                    <input type="file" ref={inputRef}
                        style={{ display: "none" }}
                        name="photo"
                        id="upload-photo"
                        onChange={() => onInputChange()}
                    />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>

                    <Controller
                        name='title'
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField className={styles.aboba}
                                {...field}
                                fullWidth={true}
                                placeholder="Add title"
                                InputProps={{
                                    disableUnderline: true,
                                }}
                            />
                        )}
                    />
                    <Controller
                        name='description'
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <TextField
                                {...field}
                                fullWidth={true}
                                placeholder="Add description"
                                InputProps={{ disableUnderline: true }}
                            />
                        )}
                    />
                    <button className={styles.addPost}
                        type="submit">
                        Add Post
                    </button>
                </form>
            </div>
        </div>
    );
};