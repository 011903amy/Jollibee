<?php

//read all by category
function checkReadAllByCategory($object)
{
  $query = $object->readAllByCategory();
  checkQuery($query, "Empty records. (read All by category)");
  return $query;
}

//read  active
function checkFilterActive($object)
{
  $query = $object->filterActive();
  checkQuery($query, "Empty records. (active)");
  return $query;
}

//read active search
function checkFilterActiveSearch($object)
{
  $query = $object->filterActiveSearch();
  checkQuery($query, "Empty records. (active)");
  return $query;
}