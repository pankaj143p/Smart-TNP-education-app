import React, { useEffect } from "react";
import ImageUploading, {
  ImageListType,
  ImageType,
} from "react-images-uploading";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoCameraOutline } from "react-icons/io5";
import axios, { AxiosResponse } from "axios";
import { Progress } from "../../../ui/progress";
import { useToast } from "../../../ui/use-toast";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom, UserState } from "@repo/store";
axios.defaults.baseURL = "http://localhost:8080/api/v1";
axios.defaults.withCredentials = true;

export function ProfilePhotoUploader({ iniImage }: { iniImage: string }) {
  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const user = useRecoilValue(userAtom);
  const [_userState, setUserState] = useRecoilState(userAtom);

  const [images, setImages] = React.useState<ImageType[]>([
    { dataURL: iniImage, key: "data_url" },
  ]);

  useEffect(() => {
    setImages([{ dataURL: iniImage, key: "1" }]);
  }, [iniImage]);

  const onChange = async (imageList: ImageListType) => {
    const uploadedFile = imageList[0];
    if (uploadedFile.file) {
      // Check if it's an image or a video
      if (uploadedFile.file.type.includes("image")) {
        await uploadMedia("image", uploadedFile.file);
      } else if (uploadedFile.file.type.includes("video")) {
        await uploadMedia("video", uploadedFile.file);
      }
    }
    if (user) user.avatar = uploadedFile.dataURL || "";
    setUserState(user);
    setImages(imageList);
  };

  //@ts-ignore some error
  const uploadMedia = async (type: string, file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const response: AxiosResponse = await axios.post(
        `profile/avatar/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              //@ts-ignore
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(progress);
          },
        }
      );
      setUserState(response.data.updatedUser as UserState);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          avatar: response.data.updatedUser.avatar,
        })
      );
      console.log("Upload successful:", response.data.updatedUser);
      toast({
        title: "Success",
        description: "Profile photo updated success!",
        variant: "default",
        className: "text-green-500",
      });

      setUploadProgress(0); // Reset progress after successful upload
    } catch (error) {
      toast({
        title: "Error",
        variant: "default",
        description: "Error in updating profile image",
        className: "text-red-600",
      });
      console.error("Error uploading media:", error);
    }
  };

  return (
    <div className="App">
      <ImageUploading
        multiple={false}
        value={images}
        onChange={onChange}
        maxNumber={1}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          <div className="upload__image-wrapper flex flex-row gap-2">
            {imageList.length === 0 && (
              <div
                className="flex h-20 w-20 rounded-full border border-white justify-center items-center text-white cursor-pointer "
                onClick={onImageUpload}
                {...dragProps}
                style={isDragging ? { color: "red" } : undefined}
              >
                <IoCameraOutline size={40} />
              </div>
            )}
            {imageList.map((image, index) => (
              <div key={index} className="image-item flex-col mb-7">
                <img
                  src={image["data_url"] || image.dataURL}
                  alt=""
                  className="flex h-20 w-20 rounded-full border border-white justify-center items-center text-white cursor-pointer"
                  onClick={() => {
                    console.log("image : ", image);
                  }}
                />

                <div className="image-item__btn-wrapper -mt-4 ml-2 flex flex-row gap-3 text-white">
                  <button
                    onClick={() => onImageUpdate(index)}
                    className="p-1 rounded-full bg-primary"
                  >
                    <FiEdit size={17} className=" " />
                  </button>
                  <button
                    onClick={() => onImageRemove(index)}
                    className="p-1 rounded-full bg-primary"
                  >
                    <MdDeleteOutline size={17} />
                  </button>
                </div>
                {uploadProgress > 0 && (
                  <div className="flex flex-row w-full">
                    {/* <p>Uploading...</p> */}
                    <Progress value={uploadProgress} className="h-2 mt-1" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}
