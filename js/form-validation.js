
    let fp_cardholder_name = true;
    let fp_card_number = true;

    const valid_field = __id => !document.querySelector( "#" + __id ).matches( ":invalid" );

    const checkForInvalid = function( _id, _err_id ) {

        let _valid_yn = valid_field( _id );

        if( _valid_yn ) {

            document.getElementById( _err_id ).classList.add( "hide-me" );
        }
        else {

            document.getElementById( _err_id ).classList.remove( "hide-me" );
        }

        return _valid_yn;
    }

    document.getElementById( "cardholder-name" ).addEventListener( "keyup", function() {

        let _pointer_html = document.getElementById( "card-personal-details-name" );
        let _cardholder_value = document.getElementById( "cardholder-name" );

        if( fp_cardholder_name ) {

            _pointer_html.innerHTML = "";
            fp_cardholder_name = false;
        }

        if( checkForInvalid( "cardholder-name", "cardholder-name-err" ) ) {

            _cardholder_value.value = _cardholder_value.value.toUpperCase();
            _pointer_html.innerHTML = _cardholder_value.value;
        }
    } );

    document.getElementById( "card-number" ).addEventListener( "keyup", function() {

        let _pointer_html = document.getElementById( "card-personal-details-number" );
        let _cardnumber_value = document.getElementById( "card-number" );

        const reformatWithSpaces = function( __item ) {

            __item = __item.replaceAll( " ", "" ).split( "" );

            let __x;
            let __formatted_item = "";
            let _counter = 1;

            while( __x = __item.shift() ) {

                __formatted_item += __x;

                if( _counter % 4 === 0 ) {

                    __formatted_item += " ";
                    _counter = 0;
                }

                _counter++;
            }

            return __formatted_item.trim();
        }

        _cardnumber_value.value = reformatWithSpaces( _cardnumber_value.value );

        if( fp_card_number ) {

            _pointer_html.innerHTML = "";
            fp_card_number = false;
        }

        if( checkForInvalid( "card-number", "card-number-err" ) ) {

            _pointer_html.innerHTML = _cardnumber_value.value;
        }
    } );

    document.getElementById( "exp-date-month" ).addEventListener( "keyup", function() {

        if( this.value.length === this.maxLength ) {

            let __year = "00";

            if( checkForInvalid( "exp-date-month", "exp-date-year-err" ) ) {

                if( document.getElementById( "exp-date-year" ).value !== "" ) {

                    __year = document.getElementById( "exp-date-year" ).value;
                }

                document.getElementById( "card-personal-details-dates" ).innerHTML = this.value.concat( "/", __year );
            }

        }
    } );

    document.getElementById( "exp-date-year" ).addEventListener( "keyup", function() {

        if( this.value.length === this.maxLength ) {

            let __month = "01";

            if( checkForInvalid( "exp-date-month", "exp-date-year-err" ) ) {

                if( document.getElementById( "exp-date-month" ).value !== "" ) {

                    __month = document.getElementById( "exp-date-month" ).value;
                }

                document.getElementById( "card-personal-details-dates" ).innerHTML = __month.concat( "/", this.value );
            }

        }
    } );

    document.getElementById( "cvc").addEventListener( "keyup", function() {

        if( this.value.length === this.maxLength ) {

            checkForInvalid( "cvc", "cvc-err" );
        }
    } );

    document.getElementById( "confirm-button" ).addEventListener( "click", function() {

        const _columns_to_validate = [ "cardholder-name", "card-number", "exp-date-month", "exp-date-year", "cvc" ];

        let _submit_success = true;

        for( let _i of _columns_to_validate ) {

            let _working_div = document.getElementById( _i );
            if( !valid_field( _i ) && _working_div.innerHTML.trim() === "" ) {
                _working_div.focus();
                _submit_success = false;
                break;
            }
        }

        if( _submit_success ) {

            document.getElementById( "form-and-result" ).innerHTML = document.getElementById( "result-success" ).innerHTML;
        }
    } );


