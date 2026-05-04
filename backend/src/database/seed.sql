INSERT INTO
	classes (id, name, stats)
VALUES
	(1, 'Warrior', ROW (10, 7, 5)),
	(2, 'Monk', ROW (4, 7, 10)),
	(3, 'Assassin', ROW (5, 10, 6)),
	(4, 'Wizard', ROW (7, 7, 7)),
	(5, 'Gladiator', ROW (6, 5, 5));

DO $$
	DECLARE
  		exercises_json jsonb;
	BEGIN
		SELECT
			pg_read_file('/docker-entrypoint-initdb.d/exercises.json')::jsonb INTO exercises_json;
		INSERT INTO
			exercises
		SELECT
			data ->> 'id',
			data ->> 'name',
			(data ->> 'force')::exercise_force,
			(data ->> 'level')::exercise_level,
			(data ->> 'mechanic')::exercise_mechanic,
			(data ->> 'equipment')::exercise_equipment,
			ARRAY (
				SELECT
					value::exercise_muscle
				FROM
					jsonb_array_elements_text(data -> 'primaryMuscles') AS value
			),
			ARRAY (
				SELECT
					value::exercise_muscle
				FROM
					jsonb_array_elements_text(data -> 'secondaryMuscles') AS value
			),
			ARRAY (
				SELECT
					value
				FROM
					jsonb_array_elements_text(data -> 'instructions') AS value
			),
			(data ->> 'category')::exercise_category,
			ARRAY (
				SELECT
					value
				FROM
					jsonb_array_elements_text(data -> 'images') AS value
			)
		FROM
			jsonb_array_elements(exercises_json) AS data;
END $$;

DO $$
	DECLARE
  		assets_json jsonb;
	BEGIN
		SELECT
			pg_read_file('/docker-entrypoint-initdb.d/items.json')::jsonb INTO assets_json;
		INSERT INTO
			items (name, category, rarity, path)
		SELECT
			data ->> 'name',
			(data ->> 'category')::item_category,
			(data ->> 'rarity')::item_rarity,
			data ->> 'path'
		FROM
			jsonb_array_elements(assets_json) AS data;
END $$;

DO $$
	DECLARE
  		nouns jsonb;
	BEGIN
		SELECT
			pg_read_file('/docker-entrypoint-initdb.d/nouns.json')::jsonb INTO nouns;
		INSERT INTO
			words (word, category)
		SELECT
			data ->> 0 AS word,
			'noun'
		FROM
			jsonb_array_elements(nouns) AS data;
END $$;

DO $$
	DECLARE
  		adjectives jsonb;
	BEGIN
		SELECT
			pg_read_file('/docker-entrypoint-initdb.d/adjectives.json')::jsonb INTO adjectives;
		INSERT INTO
			words (word, category)
		SELECT
			data ->> 0 AS word,
			'adjective'
		FROM
			jsonb_array_elements(adjectives) AS data;
END $$;
