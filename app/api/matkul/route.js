import { query } from '@/lib/db';

export async function GET(req, res) {
	const matkul = await query({
		query: `SELECT * FROM matakuliah`,
		values: [],
	});

	return new Response(JSON.stringify(matkul));
}
