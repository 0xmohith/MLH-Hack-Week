
        const passwordInput = document.getElementById('passwordInput');
        const checkBtn = document.getElementById('checkBtn');
        const strengthComment = document.getElementById('strengthComment');
        
        checkBtn.addEventListener('click', function() {
            const password = passwordInput.value;
            checkPasswordStrength(password);
        });
        
        function hasUpperCase(password) {
            return /[A-Z]/.test(password);
        }

        function hasLowerCase(password){
            return /[a-z]/.test(password);
        }

        function hasSpecialCharacter(password) {
            return /[!@#$%^&*(),.?":{}|<>]/.test(password);
        }

        function hasNumber(password){
            return /[0-9]/.test(password);
        }

        function isCommonPassword(password){
            const commonPasswords = ['password@123', '123456789', 'admin@1234', 'password','admin@123'];
            return commonPasswords.includes(password.toLowerCase());
        }

        function hasNoSpaces(password){
            return !/\s/.test(password);
        }

        function checkPasswordStrength(password) {
            let comment = '';
            
            if (password.length === 0) {
                strengthComment.textContent = 'Please enter a password to check';
                return;
            }
            
            if (password.length >= 8 && hasUpperCase(password) && hasLowerCase(password) && hasSpecialCharacter(password) && hasNumber(password) && !isCommonPassword(password) && hasNoSpaces(password)) {
                comment = "Password is Strong";
            }
            else {
                comment = "Password is Weak";
                if (password.length < 8){
                    comment = "Password must contain at least 8 characters";
                }
                else if (!hasLowerCase(password)){
                    comment = 'Password must contain at least one lower case alphabet';
                }
                else if(!hasUpperCase(password)){
                    comment = 'Password must contain at least one upper case alphabet';
                }
                else if(!hasSpecialCharacter(password)){
                    comment = 'Password must contain at least one special character';
                }
                else if(!hasNumber(password)){
                    comment = 'Password must contain at least one number';
                }
                else if(!hasNoSpaces(password)){
                    comment = 'Password must not contain any blank space';
                }
                else if(isCommonPassword(password)){
                    comment = 'Password is too common. Try something more unique';
                }
            }
            
            strengthComment.textContent = comment;
        }
    