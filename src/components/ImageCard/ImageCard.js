import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Skeleton } from 'antd';
import classNames from 'classnames/bind';

import styles from './ImageCard.module.scss';

const cx = classNames.bind(styles);
const DEFAULT_IMAGE = '/assets/img/default.jpg';

const ImageCard = ({ title, desc, button, image, link, loading }) => {
    return (
        <article className={cx('image-card')}>
            <Card
                className={cx('card-inner')}
                // eslint-disable-next-line jsx-a11y/img-redundant-alt
                cover={loading ? <Skeleton.Image /> : <img alt="" src={image || DEFAULT_IMAGE} loading="lazy" />}
                loading={loading}
            >
                {loading ? (
                    <Skeleton active paragraph={{ rows: 3 }} />
                ) : (
                    <>
                        <Card.Meta
                            title={
                                <Link to={link} className={cx('card-title')}>
                                    {title}
                                </Link>
                            }
                            description={<p>{desc}</p>}
                        />
                        {button && (
                            <Link to={link}>
                                <Button color="default" variant="outlined" size="large" className={cx('card-button')}>
                                    {button}
                                </Button>
                            </Link>
                        )}
                    </>
                )}
            </Card>
        </article>
    );
};

ImageCard.propTypes = {
    title: PropTypes.string,
    desc: PropTypes.string,
    button: PropTypes.string,
    image: PropTypes.string,
    link: PropTypes.string,
    loading: PropTypes.bool, // prop loading
};

ImageCard.defaultProps = {
    loading: false,
};

export default ImageCard;
