export const getEditableUserData = user => [
	{
		id: 'name',
		name: 'Full Name',
		value: user.name
	},

	{
		id: 'email',
		name: 'Email',
		value: user.email
	},
	{
		id: 'phone',
		name: 'Phone Number',
		value: user.phone
	},
	{
		id: 'age',
		name: 'Age',
		value: user.age
	},
	{
		id: 'company',
		name: 'Company',
		value: user.company
	},
	{
		id: 'address',
		name: 'Address',
		value: user.address
	}
];

export const getAdditionalDetails = user => [
	{
		id: 'name',
		name: 'Full Name',
		value: user.name
	},

	{
		id: 'email',
		name: 'Email',
		value: user.email
	},
	{
		id: 'phone',
		name: 'Phone Number',
		value: user.phone
	},
	{
		id: 'age',
		name: 'Age',
		value: user.age
	}
];
