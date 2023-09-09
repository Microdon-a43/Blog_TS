import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
import Text from '../Text/Text';
import cls from './Modal.module.scss';
import { deleteBtn, addSvg } from '../../assets';
import { useNavigate } from 'react-router-dom';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { InputChange } from '../../utils/commonTypes';
import axios from 'axios';

interface EditorProps {
  active?: boolean;
  closeEditor?: () => void;
  id?: string;
}

export const Editor: FC<EditorProps> = ({ active, id, closeEditor }) => {
  const [postData, setPostData] = useState({
    title: '',
    category: '',
    description: '',
  });
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleChanges = (e: InputChange) => {
    const { name, value } = e.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleFileChanges = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      if (!e.target.files) return;
      formData.append('image', e.target.files[0]);
      const { data } = await axios.post(
        'http://localhost:5000/upload',
        formData
      );
      setImageUrl(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePost = async (e: FormEvent) => {
    e.preventDefault();

    const { title, description, category } = postData;
    const updateData = {
      title,
      description,
      category,
      picture: imageUrl,
    };
  };

  function onClose() {
    console.log('click');
    active = false;
  }

 

  return (
    <div className={`${cls.overlay} ${active && cls.active}`}>
      <div className={cls.editor}>
        <div className={cls.editorTop}>
          <Text type="h1" className={cls.title}>
            Редактировать Пост
          </Text>
          <img src={deleteBtn} alt="close" onClick={closeEditor} />
        </div>
        <div className={cls.editBox}>
          <Form>
            <div className={cls.addFile}>
              <label className={cls.upload_label} htmlFor="upload-input">
                <Input
                  type="file"
                  id="upload-input"
                  name="picture"
                  className={cls.upload_input}
                  accept="image/*,.png, .jpg,.jpeg,.web"
                  onChange={handleFileChanges}
                />
                {imageUrl ? (
                  <img src={`http://localhost:5000${imageUrl}`} alt="AddFile" />
                ) : (
                  <img src={addSvg} alt="AddFile" />
                )}
              </label>
            </div>

            <Input name="title" placeholder="" onChange={handleChanges} />

            <select name="category" onChange={handleChanges}>
              <option value="" disabled selected></option>
              <option value="Еда">Еда</option>
              <option value="Путешествия">Путешествия</option>
              <option value="Спорт">Спорт</option>
              <option value="Политика">Политика</option>
            </select>
            <textarea
              name="description"
              id=""
              rows={10}
              placeholder="Введите описание поста"
              onChange={handleChanges}
            ></textarea>
            <Button type="submit">Редактировать</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
