import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';
import { FaUser, FaIdCard } from 'react-icons/fa';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    employeeId: '',
    name: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.employeeId || !formData.name) {
      setError('请填写完整的工号和姓名');
      return;
    }

    // 这里可以添加实际的登录验证逻辑
    // 目前简单实现直接跳转到首页
    router.push('/home');
  };

  return (
    <>
    
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>为i传递，祝福同行</h1>
      <div className={styles.logoContainer}>
        <img 
          src="/banner.jpg" 
          alt="系统Logo" 
          className={styles.mainLogo}
        />
      </div>
      <div className={styles.loginBox}>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="employeeId">
              <FaIdCard style={{ marginRight: '8px' }} />
              工号:
            </label>
            <input
              type="text"
              id="employeeId"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="请输入工号"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="name">
              <FaUser style={{ marginRight: '8px' }} />
              姓名:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="请输入姓名"
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button type="submit" className={styles.loginButton}>
            登录
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
