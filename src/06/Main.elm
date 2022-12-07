import Html exposing (text)
import String exposing (uncons)

--
-- impl
--

type Index = Int
type Memory = String Int (Maybe Int)

all_uniques : String -> Bool
all_uniques string =
    case uncons string of
        Just ( char , "" ) -> True
        Nothing -> True
        Just ( char, rest ) -> not (String.contains (String.fromChar char) rest) && all_uniques rest

update_memory : String -> Int -> Int -> Memory
update_memory characters limit current_index = (characters limit (if (all_uniques characters) then (Just current_index) else Nothing))


append : Memory -> Char -> Int -> Memory
append memory char index =
    case memory of
        (chars, limit, Nothing) -> update_memory (String.left limit (char :: chars)) limit index
        (chars, limit, found) -> ((String.left limit (char :: chars)) limit found)



has_found : Memory -> Bool
has_found memory = case memory of
    (_, _, Nothing) -> False
    (_, _, Just(_)) -> True

do_it : String -> Memory -> Int -> Maybe Int
do_it line memory index =
  case line of
    [] -> Nothing
    char :: rest ->
        if (has_found memory) then
            memory.found_index
        else
            do_it rest ( append memory char (index + 1) )

new_memory : -> Memory
new_memory characters limit found = ("" 4 Nothing)

part_1 : String -> Int
part_1 line = do_it line (new_memory) 0

--
--
--

main =
   part_1 "bvwbjplbgvbhsrlpgdmjqwftvncz" |> String.fromInt |>text