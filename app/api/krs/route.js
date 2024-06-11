import { query } from '@/lib/db';

export async function GET(req, res) {
	const krs = await query({
		query: `CALL sp_show_krs()`,
		values: [],
	});

	return new Response(JSON.stringify(krs[0]));
}

export async function POST(req) {
	try {
		// Parse the request body
		const body = await req.json();
		const { nim, kode_mk, kelp, ta, smt } = body;

		console.log('test :', nim, kode_mk, kelp, ta, smt);

		await query({
			query: `CALL input_krs(?, ?, ?, ?, ?)`,
			values: [nim, kode_mk, kelp, ta, smt],
		});

		return new Response(JSON.stringify({ message: 'success' }), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error parsing request body:', error);
		return new Response(
			JSON.stringify({ message: 'error', error: error.message }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}

export async function PUT(req) {
	try {
		// Parse the request body
		const body = await req.json();
		const { nim, kode_mk, kelp, ta, smt, old_mk } = body;

		console.log('test :', nim, kode_mk, kelp, ta, smt);

		await query({
			query: `CALL edit_krs(?, ?, ?, ?, ?, ?)`,
			values: [nim, kode_mk, kelp, ta, smt, old_mk],
		});

		return new Response(JSON.stringify({ message: 'success' }), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (error) {
		console.error('Error parsing request body:', error);
		return new Response(
			JSON.stringify({ message: 'error', error: error.message }),
			{
				status: 500,
				headers: { 'Content-Type': 'application/json' },
			}
		);
	}
}
