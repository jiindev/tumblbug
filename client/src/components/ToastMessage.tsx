import React, { memo, useRef, useEffect, useCallback, useState, ChangeEvent, FormEvent } from 'react';
import styled, { keyframes } from 'styled-components';
type ToastMessageProps = {
	toastSentence: string;
};

const ToastMessage = memo(({ toastSentence }: ToastMessageProps) => {
	const toastRef = useRef<HTMLDivElement>(null);
	const timeout = useRef<any>(null);

	useEffect(() => {
		clearTimeout(timeout.current);
		toastRef.current && toastRef.current.classList.remove('disappear');
		timeout.current = setTimeout(() => {
			toastRef.current && toastRef.current.classList.add('disappear');
		}, 1500);
		return () => {
			clearTimeout(timeout.current);
		};
	}, [toastSentence]);
	return (
		<ToastUI ref={toastRef}>
			<div>{toastSentence}</div>
		</ToastUI>
	);
});

export const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
export const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;
const ToastUI = styled.div`
	position: fixed;
	top: 50%;
	margin-top: -25px;
	z-index: 20;
	width: 100%;
	box-sizing: border-box;
	left: 0;
	padding: 0 15px;
	transition: all 1.5s ease;
	animation: ${fadeIn} 1.5s;
	pointer-events: none;
	&.disappear {
		animation: ${fadeOut} 1.5s;
		opacity: 0;
	}
	& > div {
		padding: 15px 30px;
		border-radius: 6px;
		background-color: rgba(107, 107, 107, 0.7);
		font-size: 22px;
		font-weight: 600;
		color: white;
		max-width: 400px;
		width: 100%;
		box-sizing: border-box;
		margin: 0 auto;
		text-align: center;
	}
	@media only screen and (min-width: 1024px) {
		flex-direction: row;
	}
`;
export default ToastMessage;
