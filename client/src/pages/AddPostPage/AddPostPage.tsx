import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addSvg } from '../../assets';
import { deleteBtn } from '../../assets';
import { Button, Form, Input, Text, VStack } from '../../components/index';
import { createPost } from '../../redux/actions/postActions';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { GlobalSchema } from '../../redux/types/globalTypes';
import { InputChange } from '../../utils/commonTypes';
import cls from './AddPost.module.scss';

const AddPostPage = () => {
  const [postData, setPostData] = useState({
    title: '',
    description: '',
    category: '',
  });

  const success = useAppSelector((state) => state.global.success);
  const error = useAppSelector((state) => state.global.error);

  const [imageUrl, setImageUrl] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChanges = (e: InputChange) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleFileChanges = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const formdata = new FormData();

      if (!e.target.files) return;

      const file = e.target.files[0];
      formdata.append('image', file);
      const { data } = await axios.post(
        'http://localhost:5000/upload',
        formdata
      );
      if (data) {
        setImageUrl(data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitChanges = (e: FormEvent) => {
    e.preventDefault();

    const { title, description, category } = postData;
    const responseData = {
      title,
      description,
      category,
      picture: imageUrl,
    };

    dispatch(createPost(responseData, navigate));
    if (success === '') {
      return;
    } else {
      alert(success)
    }
  };

  return (
    <div className="container">
      <VStack gap={15} className={cls.addPost} max={true}>
        <Text type="h1" className={cls.title}>
          Добавить Пост
        </Text>
        <Form onSubmit={submitChanges}>
          <div className={cls.addFile}>
            <div className={cls.addFileWrap}>
              <Input
                type="file"
                id="upload-input"
                name="picture"
                className={cls.upload_input}
                accept="image/*,.png, .jpg,.jpeg,.web"
                onChange={handleFileChanges}
              />
              <img
                className={cls.deleteBtn}
                src={deleteBtn}
                alt="deletePic"
                onClick={() => {
                  setImageUrl('');
                }}
              />
              <label className={cls.upload_label} htmlFor="upload-input">
                {imageUrl ? (
                  <div className={cls.imageBox}>
                    <img src={`http://localhost:5000${imageUrl}`} alt="add" />
                  </div>
                ) : (
                  <>
                    <img src={addSvg} alt="add" />
                    <span>Выберите файл(ы)</span>
                  </>
                )}
              </label>
            </div>
          </div>
          <Input
            name="title"
            className={cls.sec_input}
            placeholder="Введите название поста"
            onChange={handleChanges}
          />
          <select name="category" onChange={handleChanges}>
            <option value="" disabled selected>
              Выберите категорию
            </option>
            <option value="Food">Еда</option>
            <option value="Trips">Путешествия</option>
            <option value="Sport">Спорт</option>
            <option value="Politics">Политика</option>
          </select>
          <textarea
            name="description"
            rows={10}
            id=""
            placeholder="Введите описание поста"
            onChange={handleChanges}
          ></textarea>
          <Button>Добавить</Button>
        </Form>
      </VStack>
    </div>
  );
};

export default AddPostPage;
