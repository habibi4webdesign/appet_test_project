import React from 'react';
import { Field, reduxForm ,Form  } from 'redux-form';
import {InputText} from 'primereact/components/inputtext/InputText';
import {Message} from 'primereact/components/message/Message';
import {Button} from 'primereact/components/button/Button';
import {Checkbox} from 'primereact/components/checkbox/Checkbox';




const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'نام کاربری اجباری است'
    }

    if (!values.password) {
        errors.password = 'رمز عبور اجباری است'
    }

    return errors;
}




const simpleInput = ({ input, label, type, meta: { touched, error, warning } }) => {
    return (
    <span className="ui-float-label " >
        <InputText {...input} className="float-input" type={type}  placeholder={label}/>
        {/* <label htmlFor="float-input">{label}</label> */}
        {touched && ((error &&   <Message  severity="error" text={error}></Message>) || (warning && <Message severity="warn" text={warning}></Message> ))}
    </span>);

}



const LoginForm = props => {
    const { handleSubmit, handleForm, submitting, pristine, errorMessage } = props;
    return (
        <div className="login-form--container">
            <div className="login-page">
                <form onSubmit={handleSubmit(handleForm)} className='attached fluid segment mrgT15 mrgB15'>
               
                    <h2> ورود به سیستم </h2>
                     <span className="mrgB15 d-block">
                        برای ورود نام کاربری و رمز عبور خود را وارد کنید
                     </span>
                    <div className="ui-g mrgB5">
                        <div className="ui-g-12">
                        <Field
                            name='username'
                            component={simpleInput}
                            label='نام کاربری'
                            type='text'
                        />
                        </div>
                    </div>

                    <div className="ui-g">
                        <div className="ui-g-12">
                        <Field name='password'
                            component={simpleInput}
                            type='password'
                            label='رمز ورود'
                            />
                        </div>
                    </div>
                    <div className="ui-g">
                        <div className="ui-g-12">
                        <Button label="ورود" type="submit" disabled={pristine || submitting}  className="ui-button-danger ui-g-12"/>
                        </div>
                    </div>
                </form>


                {errorMessage && 
                    <div className="big-message ui-g-12">
                        <Message  severity = 'error' text={errorMessage}></Message>
                    </div>

                }

            </div>
        </div>

    )
}

function showResponse(response) {
 }

export default reduxForm({
    form: 'loginForm', validate
})(LoginForm)




    {/* <div>
        <label>{label}</label>
        <div>
            <input {...input} placeholder={label} type={type} />
            {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
    </div> */}