import Image from "next/image";
import Link from "next/link";
import cls from 'classnames';

import style from './card.module.css';
export default function Card(props) {
  return (
		<Link href={props.href} className={style.cardLink}>
			<div className={cls('glass', style.container)}>
				<div className={style.cardHeaderWrapper}>
					<h2 className={style.cardHeader}>{props.name}</h2>
				</div>
				<div className={style.cardImageWrapper}>
					<Image src={props.imageUrl} width={260} height={160} alt="Card image" className={style.cardImage}/>
				</div>
			</div>
		</Link>
	);
}
