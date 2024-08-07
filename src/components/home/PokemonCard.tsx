import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PokemonCard.module.css';
import { Pokemon } from '@/types/pokemon.type';

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
    const pokemonImgSrc = pokemon.image || pokemon.sprites.front_default;
    const [isFlipped, setIsFlipped] = useState(false);

    const handleTouch = (e: React.TouchEvent) => {
        // 모바일 클릭했을때 이슈 수정
        const touchDuration = 200;
        let timer: NodeJS.Timeout;

        const touchStart = () => {
            timer = setTimeout(() => {
                setIsFlipped(true);
            }, touchDuration);
        };

        const touchEnd = () => {
            clearTimeout(timer);
            setIsFlipped(false);
        };

        e.type === 'touchstart' ? touchStart() : touchEnd();
    };
    return (
        <Link href={`/detail/${pokemon.id}`} className={styles.pokemonCard}>
            <div
                className={`${styles.cardInner} ${isFlipped ? styles.flipped : ''}`}
                onTouchStart={handleTouch}
                onTouchEnd={handleTouch}
            >
                {/* 카드 앞면 */}
                <div className={styles.cardFront}>
                    <div className={`relative ${styles.paperTexture}`}>
                        <div className="relative w-full h-full flex justify-center items-center">
                            <div className="relative w-full h-130px">
                                <Image
                                    src={pokemonImgSrc}
                                    alt={pokemon.name}
                                    fill
                                    className={`${styles.image} rounded-t-lg`}
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-17 bg-custom-blue text-white text-center p-2 rounded-b-none">
                        <p className="text-2xl font-semibold mt-1">{pokemon.korean_name}</p>
                        <p className="text-base">도감번호: {pokemon.id}</p>
                    </div>
                </div>
                {/* 카드 뒷면 */}
                <div className={styles.cardBack}>
                    <Image
                        src="/card-back.jpg"
                        alt="Pokemon Card Back"
                        layout="fill"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 240px"
                        className={`${styles.image} rounded-lg`}
                        priority
                    />
                </div>
            </div>
        </Link>
    );
};

export default PokemonCard;
