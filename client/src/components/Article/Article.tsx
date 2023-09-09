import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '../index';
import Flex from '../Stack/Flex';
import cls from './Article.module.scss';
import { options } from '../../assets';

interface ArticleProps {
  title: string;
  description: string;
  createdAt: Date | string;
  id: string;
  onDeletePost?: any;
  onOpenEditor?: any;
}

const Article: FC<ArticleProps> = ({
  title,
  description,
  createdAt,
  id,
  onDeletePost,
  onOpenEditor,
}) => {
  const [showOptions, setShowOptions] = useState(false);

  const onShowOptions = () => {
    setShowOptions(!showOptions);
  };

  const onCloseOptions = () => {
    setShowOptions(false);
  };

  return (
    <article className={cls.article}>
      <Flex justify="between" align="center" className={cls.article_top}>
        <Link to={id}>
          <Text type="h2" className={cls.title}>
            {title}
          </Text>
        </Link>
        <div>
          <img
            src={options}
            alt="options"
            onFocus={onShowOptions}
            onBlur={onCloseOptions}
            tabIndex={0}
          />
          <ul className={`${cls.modal} ${showOptions && cls.active}`}>
            <li className={cls.delete} onMouseDown={() => onDeletePost(id)} tabIndex={1}>
              <Link to="">Удалить</Link>
            </li>
            <li className={cls.edit} onMouseDown={() => onOpenEditor(id)} tabIndex={1}>
              <Link to="">Редактировать</Link>
            </li>
            <li className={cls.share}>
              <Link to="">Поделиться</Link>
            </li>
          </ul>
        </div>
      </Flex>
      <span>{createdAt.toString()}</span>
      <p className={cls.text}>
        {description.length > 100
          ? description.slice(0, 300) + '...'
          : description}
      </p>
    </article>
  );
};

export default Article;
