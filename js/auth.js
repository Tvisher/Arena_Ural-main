const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const auth = {
    data() {
        return {
            showModal: false,
            modalText: '',
            showFormType: 'auth',
            authFormData: {
                email: '',
                password: '',
                checkValidate: false,
                ajaxErrors: [],
            },
            registerData: {
                email: '',
                password: '',
                passwordRepeat: '',
                checkValidate: false,
                errors: []
            },
            createCabinetData: {
                name: '',
                surname: '',
                patronymic: '',
                phone: '',
                gender: 'Мужской',
                birthday: '',
                fanID: '',
                checkValidate: false,
                consentPersonalData: false,
                agreementToSiteRules: false,
                errors: []
            },
            forgotEmailData: {
                email: '',
                checkValidate: false,
                errors: []
            }
        }
    },
    methods: {
        isEmailValid(value) { return EMAIL_REGEXP.test(value) },
        setFogotEmail() {
            const forgotEmailData = this.forgotEmailData;
            forgotEmailData.checkValidate = true;
            if (!this.isEmailValid(forgotEmailData.email)) {
                if (!forgotEmailData.errors.includes('invalid-email')) {
                    forgotEmailData.errors.push('invalid-email')
                }
                return
            }
            console.log(forgotEmailData.email);
            this.modalText = `Ссылка для востановление пароля отправлена на <span style="color:#EF723B">${forgotEmailData.email}.</span>`;
            this.showModal = true;

        },
        showAuthScreen() {
            this.showFormType = 'auth';
            const authFormData = this.authFormData;
            authFormData.checkValidate = false;
            authFormData.email = '';
            authFormData.password = '';

            const registerData = this.registerData;
            registerData.email = '';
            registerData.password = '';
            registerData.passwordRepeat = '';
            registerData.checkValidate = false;
            registerData.errors = [];

            const createCabinetData = this.createCabinetData;
            createCabinetData.name = '';
            createCabinetData.surname = '';
            createCabinetData.patronymic = '';
            createCabinetData.phone = '';
            createCabinetData.gender = 'Мужской';
            createCabinetData.birthday = '';
            createCabinetData.fanID = '';
            createCabinetData.checkValidate = false;
            createCabinetData.consentPersonalData = false;
            createCabinetData.agreementToSiteRules = false;
            createCabinetData.errors = [];

            const forgotEmailData = this.forgotEmailData;
            forgotEmailData.email = '';
            forgotEmailData.checkValidate = false;
            forgotEmailData.errors = [];

            this.showModal = false;

        },
        closeModal(e) {
            const target = e.target;
            if ((target.closest('.auth-block-modal') && !target.closest('.auth-block-modal__content')) || target.closest('.auth-block-modal__close')) {
                this.showAuthScreen()
            }
        },
        getAuth() {
            this.authFormData.checkValidate = true;
            const authForm = document.querySelector('.auth-form');
            const authErrors = authForm.querySelector('has-error');
            if (authErrors) return;
            console.log(this.authFormData);

        },
        createUser() {
            const registerData = this.registerData;
            const createCabinetData = this.createCabinetData;
            createCabinetData.checkValidate = true;
            if (!this.isEmailValid(registerData.email)) {
                if (!createCabinetData.errors.includes('invalid-email')) {
                    createCabinetData.errors.push('invalid-email')
                }
            }
            if (createCabinetData.name.length < 1) {
                if (!createCabinetData.errors.includes('invalid-name')) {
                    createCabinetData.errors.push('invalid-name')
                }
            }
            if (createCabinetData.surname.length < 1) {
                if (!createCabinetData.errors.includes('invalid-surname')) {
                    createCabinetData.errors.push('invalid-surname')
                }
            }

            if (createCabinetData.patronymic.length < 1) {
                if (!createCabinetData.errors.includes('invalid-patronymic')) {
                    createCabinetData.errors.push('invalid-patronymic')
                }
            }
            if (createCabinetData.phone.trim().length < 16) {
                if (!createCabinetData.errors.includes('invalid-phone')) {
                    createCabinetData.errors.push('invalid-phone')
                }
            }

            if (!createCabinetData.birthday.length) {
                if (!createCabinetData.errors.includes('invalid-birthday')) {
                    createCabinetData.errors.push('invalid-birthday')
                }
            }

            if (!createCabinetData.consentPersonalData) {
                if (!createCabinetData.errors.includes('invalid-consentPersonalData')) {
                    createCabinetData.errors.push('invalid-consentPersonalData')
                }
            }

            if (!createCabinetData.agreementToSiteRules) {
                if (!createCabinetData.errors.includes('invalid-agreementToSiteRules')) {
                    createCabinetData.errors.push('invalid-agreementToSiteRules')
                }
            }

            if (!createCabinetData.errors.length) {
                console.log(createCabinetData, this.registerData);
                this.modalText = 'Вы успешно зарегистрированы на сайте!';
                this.showModal = true;
            }



        },
        hideRegErr(e) {
            const filed = e.target.name;
            const registerData = this.registerData;

            if (filed === 'email') {
                registerData.errors = registerData.errors.filter(el => el != "invalid-email");
            }

            if (filed === 'pass') {
                registerData.errors = registerData.errors.filter(el => el != "invalid-pass");
            }

            if (filed === 'pass-repeat') {
                registerData.errors = registerData.errors.filter(el => el != "not-match");
            }
        },
        hideCreateErr(e) {
            const filed = e.target.name;
            const createCabinetData = this.createCabinetData;
            if (filed === 'name') {
                createCabinetData.errors = createCabinetData.errors.filter(el => el != "invalid-name");
            }

            if (filed === 'surname') {
                createCabinetData.errors = createCabinetData.errors.filter(el => el != "invalid-surname");
            }

            if (filed === 'patronymic') {
                createCabinetData.errors = createCabinetData.errors.filter(el => el != "invalid-patronymic");
            }

            if (filed === 'email') {
                createCabinetData.errors = createCabinetData.errors.filter(el => el != "invalid-email");
            }

            if (filed === 'phone') {
                createCabinetData.errors = createCabinetData.errors.filter(el => el != "invalid-phone");
            }
        },

        hideFogotErr(e) {
            const filed = e.target.name;
            const forgotEmailData = this.forgotEmailData;
            if (filed === 'email') {
                forgotEmailData.errors = forgotEmailData.errors.filter(el => el != "invalid-email");
            }
        },
        checkAgree(e) {
            const filed = e.target.name;
            const isChecked = e.target.checked;
            const createCabinetData = this.createCabinetData;

            if (isChecked) {
                if (filed === 'consentPersonalData') {
                    createCabinetData.errors = createCabinetData.errors.filter(el => el != "invalid-consentPersonalData");
                }
                if (filed === 'agreementToSiteRules') {
                    createCabinetData.errors = createCabinetData.errors.filter(el => el != "invalid-agreementToSiteRules");
                }
            }
        },

        createCabinetStep() {
            this.registerData.checkValidate = true;
            if (!this.isEmailValid(this.registerData.email)) {
                if (!this.registerData.errors.includes('invalid-email')) {
                    this.registerData.errors.push('invalid-email')
                }
            }
            const passRegex = /^[a-zA-Z0-9]+$/;
            if (!passRegex.test(this.registerData.password) || this.registerData.password.length < 6) {
                if (!this.registerData.errors.includes('invalid-pass')) {
                    this.registerData.errors.push('invalid-pass')
                }
            }
            if (this.registerData.password.length < 1 || (this.registerData.password !== this.registerData.passwordRepeat)) {
                if (!this.registerData.errors.includes('not-match')) {
                    this.registerData.errors.push('not-match');
                }
            }

            if (!this.registerData.errors.length) {
                this.showFormType = 'create-cabinet'
            }
        }
    },
    watch: {
        showFormType(newVal) {
            if (newVal === 'create-cabinet') {
                const vueInstance = this;
                vueInstance.$nextTick(() => {
                    $('.select').select2({
                        minimumResultsForSearch: Infinity,
                        width: 'auto',
                    });

                    $('.select').on('select2:select', (e) => {
                        vueInstance.createCabinetData.gender = e.params.data.id;
                    });


                    IMask(document.querySelector('.form_input.phone-input')
                        , {
                            mask: '+{7}(000)000-00-00'
                        })


                    const picker = new easepick.create({
                        element: document.querySelector('.date__input')
                        ,
                        css: [
                            "vendors/easepick/easepick.css?v=1",
                            "vendors/easepick/customize_easepick.css?v=1",
                        ],
                        setup(picker) {
                            if (vueInstance.createCabinetData.birthday != '') {
                                picker.setDate(vueInstance.createCabinetData.birthday);
                            }
                            picker.on('select', (e) => {
                                const date = new Date(e.detail.date);
                                const day = date.getDate();
                                const month = date.getMonth() + 1;
                                const year = date.getFullYear();
                                const formattedDate = (day < 10 ? '0' : '') + day + '.' + (month < 10 ? '0' : '') + month + '.' + year;
                                vueInstance.createCabinetData.birthday = formattedDate;
                                vueInstance.createCabinetData.errors = vueInstance.createCabinetData.errors.filter(el => el != "invalid-birthday");
                            });
                        },
                        lang: 'ru-US',
                        format: "DD.MM.YYYY",
                        zIndex: 100,
                        AmpPlugin: {
                            locale: {
                                resetButton: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.41425 7.00025L13.7072 1.70725C14.0982 1.31625 14.0982 0.68425 13.7072 0.29325C13.3162 -0.09775 12.6842 -0.09775 12.2933 0.29325L7.00025 5.58625L1.70725 0.29325C1.31625 -0.09775 0.68425 -0.09775 0.29325 0.29325C-0.09775 0.68425 -0.09775 1.31625 0.29325 1.70725L5.58625 7.00025L0.29325 12.2933C-0.09775 12.6842 -0.09775 13.3162 0.29325 13.7072C0.48825 13.9022 0.74425 14.0002 1.00025 14.0002C1.25625 14.0002 1.51225 13.9022 1.70725 13.7072L7.00025 8.41425L12.2933 13.7072C12.4882 13.9022 12.7443 14.0002 13.0002 14.0002C13.2562 14.0002 13.5122 13.9022 13.7072 13.7072C14.0982 13.3162 14.0982 12.6842 13.7072 12.2933L8.41425 7.00025Z"/></svg>'
                            },
                            darkMode: false,
                            dropdown: {
                                months: true,
                                years: true,
                                minYear: 1900
                            }
                        },
                        locale: {
                            cancel: "Отмена",
                            apply: "Применить",
                            previousMonth: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.5 25L17.5 20L22.5 15" stroke="#667085" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                            nextMonth: '<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 25L22.5 20L17.5 15" stroke="#667085" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/></svg>',
                        },
                        plugins: [
                            "AmpPlugin"
                        ]
                    });
                })
            }
        }
    },
    mounted() {
        this.$el.parentElement.style.opacity = '1';
    }
}

Vue.createApp(auth).mount('#auth-block');


const passEyes = document.querySelectorAll('.show-pass');
passEyes.forEach(el => {
    el.addEventListener('pointerdown', (e) => {
        el.classList.add('show');
        const passInput = el.closest('.pass-input__wrapper').querySelector('.pass-input');
        passInput.type = 'text';
    });

    el.addEventListener('pointerup', (e) => {
        el.classList.remove('show');
        const passInput = el.closest('.pass-input__wrapper').querySelector('.pass-input');
        passInput.type = 'password';
    })
})