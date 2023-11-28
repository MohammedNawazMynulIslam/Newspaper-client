import { useForm, Controller } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import Select from "react-select";
import { useEffect, useState } from "react";
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddArticle = () => {
  const { register, handleSubmit, reset, control } = useForm();
  const tagOptions = [
    { value: "tag1", label: "Tag 1" },
    { value: "tag2", label: "Tag 2" },
  ];
  const [publishers, setPublishers] = useState([]);
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    console.log(data);
    const imageFile = { image: data.image[0] };
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data.success) {
      const publisherName = data.publisher ? data.publisher.label : "";
      const article = {
        title: data.title,
        publisher: publisherName,
        image: res.data.data.display_url,
        tags: data.tags.map((tag) => tag.label),
        description: data.description,
      };
      const articleRes = await axiosSecure.post("/article", article);
      console.log(articleRes.data);
      if (articleRes.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-start",
          icon: "success",
          title: `${data.title} added`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  useEffect(() => {
    const publishers = async () => {
      try {
        const res = await axiosPublic.get("/publishers");
        setPublishers(res.data);
      } catch (error) {
        console.error("error fetching", error);
      }
    };
    publishers();
  }, [axiosPublic]);

  return (
    <div>
      <Helmet>
        <title>Newspaper || Add Article</title>
      </Helmet>
      <h2 className="text-center text-4xl my-9">Add Article</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto">
        {/* title */}
        <div className="mb-5">
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: true })}
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Title"
            required
          />
        </div>
        {/* img */}
        <div className="mb-5">
          <label
            htmlFor="Image"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Image
          </label>
          <input
            type="file"
            {...register("image")}
            id="image"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required
          />
        </div>
        {/* publisher */}
        <div className="mb-5">
          <label
            htmlFor="publisher"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Publisher
          </label>
          <Controller
            name="publisher"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={publishers.map((publisher) => ({
                  value: publisher.id,
                  label: publisher.name,
                }))}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select Publisher"
                isClearable
              />
            )}
            rules={{ required: "Publisher is required" }}
          />
        </div>

        {/* tags */}
        <div className="mb-5">
          <label
            htmlFor="tags"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Tags
          </label>
          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={tagOptions}
                isMulti
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select Tags"
              />
            )}
            rules={{ required: "Tags are required" }}
          />
        </div>
        {/* description */}
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            {...register("description", { required: true })}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="description"
            required
          />
        </div>
        {/* submit btn */}
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddArticle;
