/**
 * External dependencies.
 */
import { Component } from '@wordpress/element';
import { xor } from 'lodash';

/**
 * Internal dependencies.
 */
import FieldBase from '../../components/field-base';
import NoOptions from '../../components/no-options';

class SetField extends Component {
	/**
	 * Handles the change of the field.
	 *
	 * @param  {Object} e
	 * @return {void}
	 */
	handleChange = ( e ) => {
		const {
			id,
			value,
			onChange
		} = this.props;

		onChange(
			id,
			xor( value, [ e.target.value ] )
		);
	}

	/**
	 * Checks if the given option is checked.
	 *
	 * @param  {Array} values
	 * @param  {Object} option
	 * @return {boolean}
	 */
	isChecked = ( values, option ) => {
		return values.indexOf( option.value ) > -1;
	}

	/**
	 * Render the component.
	 *
	 * @return {Object}
	 */
	render() {
		const {
			id,
			field,
			name,
			value
		} = this.props;

		return (
			<FieldBase id={ id } field={ field }>
				{
					field.options.length > 0
						? (
							field.options.map( ( option ) => (
								<label key={ `${ id }-${ option.value }` }>
									<input
										type="checkbox"
										id={ `${ id }-${ option.value }` }
										name={ `${ name }-${ option.value }` }
										checked={ this.isChecked( value, option ) }
										value={ option.value }
										onChange={ this.handleChange }
										{ ...field.attributes }
									/>

									{ option.label }
								</label>
							) )
						)
						: <NoOptions />
				}
			</FieldBase>
		);
	}
}

export default SetField;
