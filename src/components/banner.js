import styles from '@/styles/Banner.module.css';

const Banner = (props) => {
	return <div className={styles.container}>
		<h1 className={styles.title}>
			Coffee Shops
		</h1>
		<div className={styles.subTitle}>Discover your local coffee stores!</div>
		<div className={styles.buttonWrapper}>
			<button className={styles.button} onClick={props.handleOnClick}>
				{props.buttonText}
			</button>
		</div>
	</div>;
}

export default Banner;
