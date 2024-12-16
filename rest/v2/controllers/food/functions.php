<?php

//read all by category
function checkReadAllByCategory($object)
{
  $query = $object->readAllByCategory();
  checkQuery($query, "Empty records. (read All by category)");
  return $query;
}