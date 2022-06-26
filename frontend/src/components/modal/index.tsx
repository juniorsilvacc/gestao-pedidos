import React from 'react';
import Modal from 'react-modal';
import styles from './styles.module.css';
import { FiX } from 'react-icons/fi';

import { OrderItemProps } from '../../pages/dashboard';

interface ModelOderProps{
  isOpen: boolean;
  onRequestClose: () => void;
  order: OrderItemProps[];
}

export default function ModalOrder({ isOpen, onRequestClose, order }: ModelOderProps) {
  
  const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        padding: '30px',
        backgroundColor: '#D2D2D2',
        transform: 'translate(-50%, -50%)',
    },
};

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <button
        type='button'
        onClick={onRequestClose}
        className="react-modal-close"
        style={{background: 'transparent', border: 0}}
      >
        <FiX size={45} color='#EA1D2C' />
      </button>

      <div className={styles.container}>
        <h1 className={styles.details}>Detalhes do Pedido</h1>
        {/* <span className={styles.table}>
          Mesa: <strong>{order[0].order.table}</strong>
        </span>

        {order.map(item => (
          <section key={item.id}>
            <span>{item.amount} - { item.product.name }</span>
          </section>
        ))} */}
      </div>
    </Modal>
  );
}
