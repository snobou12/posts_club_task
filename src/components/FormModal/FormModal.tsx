
import classNames from "classnames";
import React, { FC } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import debounce from "lodash.debounce";
import {
	useAppDispatch,
	useAppSelector,
} from "../../hooks/useDispatchSelector";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import {
	handleChangeFormData,
	handleClearFormData,
} from "../../redux/reducers/PostReducer/PostReducer";
import { CustomButton } from "../../ui";
import { buttonTypes } from "../../ui/CustomButton/CustomButton";
import "./FormModal.scss";
import { sendComment } from "../../redux/reducers/PostReducer/ActionPostCreator";
const rgEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

type Props = {
	show: boolean;
	setShowModal: (bool: boolean) => void;
	postId: number;
	isLoading: boolean;
	visuallyImpaired: boolean;
};

type FormValuesType = {
	name: string;
	email: string;
	body: string;
};

const FormModal: FC<Props> = ({
	isLoading,
	show,
	setShowModal,
	postId,
	visuallyImpaired,
}) => {
	const dispatch = useAppDispatch();
	const { formData } = useAppSelector(state => state.PostReducer);
	const [formDataValues, setFormDataValues] = React.useState<FormValuesType>({
		name: formData.name,
		email: formData.email,
		body: formData.body,
	});
	const handleChangeFormValues = React.useCallback(
		debounce((value: string, target: string) => {
			dispatch(handleChangeFormData({ value, type: target }));
		}, 100),
		[]
	);

	const onChangeInput = (
		e: React.ChangeEvent<HTMLInputElement>,
		target: string
	) => {
		let newValues = { ...formDataValues };
		switch (target) {
			case "name":
				newValues = { ...newValues, name: e.target.value };
				break;
			case "email":
				newValues = { ...newValues, email: e.target.value };

				break;
			case "body":
				newValues = { ...newValues, body: e.target.value };

				break;

			default:
				break;
		}
		setFormDataValues(newValues);
		handleChangeFormValues(e.target.value, target);
	};

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		if (
			formData.body.length === 0 ||
			formData.email.length === 0 ||
			formData.name.length === 0
		) {
			return toast.error("Не заполнены все данные.");
		}
		if (!rgEmail.exec(formData.email)) {
			return toast.error("Некорректно введена почта.");
		}

		dispatch(
			sendComment([
				postId,
				uuidv4(),
				formData.name,
				formData.email,
				formData.body,
			])
		).then(() => {
			dispatch(handleClearFormData());
			setFormDataValues({ name: "", email: "", body: "" });
			toast.success("Комментарий успешно отправлен");
			setShowModal(false);
		});
	};
	return (
		<div
			className={classNames("form_modal", {
				"form_modal--show": show,
				"form_modal--glasses": visuallyImpaired,
			})}
		>
			<div className="form__block">
				<div onClick={() => setShowModal(false)} className="form__close">
					<AiOutlineCloseCircle size={visuallyImpaired ? "35" : "25"} />
				</div>
				<form onSubmit={e => handleSubmit(e)}>
					<div className="form__title">Создание комментария</div>
					<div className="form__name form__item">
						<span>Имя</span>
						<input
							disabled={isLoading}
							type="text"
							onChange={e => onChangeInput(e, "name")}
							placeholder="Имя"
							value={formDataValues.name}
						/>
					</div>
					<div className="form__email form__item">
						<span>Эл.почта</span>
						<input
							disabled={isLoading}
							type="text"
							onChange={e => onChangeInput(e, "email")}
							placeholder="Почта"
							value={formDataValues.email}
						/>
					</div>

					<div className="form__text form__item">
						<span>Текст</span>
						<input
							disabled={isLoading}
							type="text"
							placeholder="Текст"
							onChange={e => onChangeInput(e, "body")}
							value={formDataValues.body}
						/>
					</div>
					{!isLoading && (
						<div className="form__submit">
							<CustomButton type={buttonTypes.PRIMARY}>
								Отправить Комментарий
							</CustomButton>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default FormModal;
