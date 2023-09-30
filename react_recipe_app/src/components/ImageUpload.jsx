import React, { useState } from 'react';

function ImageUpload() {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 画像をFlaskに送信
        const formData = new FormData();
        formData.append('image', image);

        try {
            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                console.log('画像がアップロードされました');
            } else {
                console.error('アップロードエラー');
            }
        } catch (error) {
            console.error('ネットワークエラー', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleImageChange} />
                <button type="submit">アップロード</button>
            </form>
        </div>
    );
}

export default ImageUpload;