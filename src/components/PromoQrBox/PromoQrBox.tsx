import { ReactElement } from 'react';
import styles from './PromoQrBox.module.scss';

const PromoQrBox = (): ReactElement => {
  return (
    <div className={styles.qrbox}>
      <h4 className={styles.qrbox__title}>
        СКАНИРУЙТЕ QR-КОД ДЛЯ ПОЛУЧЕНИЯ ДОПОЛНИТЕЛЬНОЙ ИНФОРМАЦИИ
      </h4>
      <div className={styles.qrbox__qr} />
    </div>
  );
};

export default PromoQrBox;
