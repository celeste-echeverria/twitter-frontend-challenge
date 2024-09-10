import React, {ChangeEvent, useEffect, useState} from "react";
import Button from "../button/Button";
import TweetInput from "../tweet-input/TweetInput";
import {setLength, updateFeed} from "../../redux/user";
import ImageContainer from "../tweet/tweet-image/ImageContainer";
import {BackArrowIcon} from "../icon/Icon";
import ImageInput from "../common/ImageInput";
import {useTranslation} from "react-i18next";
import {ButtonType} from "../button/StyledButton";
import {StyledTweetBoxContainer} from "./TweetBoxContainer";
import {StyledContainer} from "../common/Container";
import {StyledButtonContainer} from "./ButtonContainer";
import {useDispatch, useSelector} from "react-redux";
import {Author} from "../../interfaces/user.interface";
import { RootState } from "../../redux/store";
import { useGetMe } from "../../hooks/useGetMe";
import { useGetFeed } from "../../hooks/useGetFeed";
import { useTweet } from "../../hooks/useTweet";
import { useQueryClient } from "@tanstack/react-query";
import { useComment } from "../../hooks/useComment";
import ToastPortal from "../toast/ToastPortal";  
import { ToastType } from "../toast/Toast";


interface TweetBoxProps {
    parentId?: string,
    close?: () => void,
    mobile?: any
    borderless?: any
}

const TweetBox: React.FC<TweetBoxProps> = ({parentId, close, mobile}: TweetBoxProps) => {
    const queryClient= useQueryClient();

    const [content, setContent] = useState<string>("");
    const [images, setImages] = useState<File[]>([]);
    const [imagesPreview, setImagesPreview] = useState<string[]>([]);

    const {length, query} = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const {data: user, isLoading: userIsLoading, isError: userIsError, error: userError} = useGetMe();
    const {mutate: createTweet, isError: tweetIsError, error: tweetError, isSuccess: tweetIsSuccess} = useTweet({
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['FeedPosts'],
                refetchType: 'active',
            })
        }
    });

    const {mutate: createComment, isPending: commentIsPending} = useComment({
        parentId: parentId ?? '',
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['FeedPosts'],
                refetchType: 'active',
            })
        }
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setContent(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            setContent("");
            setImages([]);
            setImagesPreview([]);
            if (parentId) {
                createComment({content, images});
            } else{
                createTweet({content, images});
            }
            close && close();
        } catch (e) {
            console.log(e);
        }
    };

    const handleRemoveImage = (index: number) => {
        const newImages = images.filter((i, idx) => idx !== index);
        const newImagesPreview = newImages.map((i) => URL.createObjectURL(i));
        setImages(newImages);
        setImagesPreview(newImagesPreview);
    };
    
    const handleAddImage = (newImages: File[]) => {
        setImages(newImages);
        const newImagesPreview = newImages.map((i) => URL.createObjectURL(i));
        setImagesPreview(newImagesPreview);
    };

    return (
        <div>
            <StyledTweetBoxContainer>
                {mobile && (
                    <StyledContainer
                        flexDirection={"row"}
                        justifyContent={"space-between"}
                        alignItems={"center"}
                    >
                        <BackArrowIcon onClick={close}/>
                        <Button
                            text={"Tweet"}
                            buttonType={ButtonType.DEFAULT}
                            size={"SMALL"}
                            onClick={handleSubmit}
                            disabled={content.length === 0}
                        />
                    </StyledContainer>
                )}
                <StyledContainer style={{width: "100%"}}>
                    <TweetInput
                        onChange={handleChange}
                        maxLength={240}
                        placeholder={t("placeholder.tweet")}
                        value={content}
                        src={user?.profilePicture}
                    />
                    <StyledContainer padding={"0 0 0 10%"}>
                        <ImageContainer
                            editable
                            images={imagesPreview}
                            removeFunction={handleRemoveImage}
                        />
                    </StyledContainer>
                    <StyledButtonContainer>
                        <ImageInput setImages={handleAddImage} parentId={parentId}/>
                        {!mobile && (
                            <Button
                                text={"Tweet"}
                                buttonType={ButtonType.DEFAULT}
                                size={"SMALL"}
                                onClick={handleSubmit}
                                disabled={
                                    content.length <= 0 ||
                                    content.length > 240 ||
                                    images.length > 4 ||
                                    images.length < 0
                                }
                            />
                        )}
                    </StyledButtonContainer>
                </StyledContainer>
            </StyledTweetBoxContainer>
            {tweetIsError && <ToastPortal message={tweetError.message} type={ToastType.ERROR} />}
            {tweetIsSuccess && <ToastPortal message="Tweet posted successfully" type={ToastType.SUCCESS} />}    
         </div>
    );
};

export default TweetBox;
